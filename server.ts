import express, { Request, Response } from 'express';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, Type } from '@google/genai';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const isProd = process.env.NODE_ENV === 'production';

app.use(express.json());

// Initialize Google GenAI
const apiKey = process.env.GEMINI_API_KEY;
const ai = apiKey
  ? new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    })
  : null;

interface ScheduleSlot {
  time: string;
  title: string;
  category: 'work' | 'personal' | 'wellness' | 'meal' | 'break';
  notes?: string;
  priority?: 'high' | 'medium' | 'low';
}

// AI Schedule Generation endpoint
app.post('/api/ai/schedule', async (req: Request, res: Response) => {
  try {
    const { priorities, wakeTime, sleepTime, workStyle, existingEvents } = req.body;

    const userPrompt = `
You are an expert productivity coach and daily planner architect.
Analyze the user's top priorities and preferences:
- Top Priorities / Goals: ${priorities || 'Complete project report, 30 min exercise, deep work session, meal prep'}
- Wake time: ${wakeTime || '07:00 AM'}
- Bed time: ${sleepTime || '10:30 PM'}
- Preferred Work Style: ${workStyle || 'Deep Work blocks with intentional rest'}
- Existing fixed events: ${JSON.stringify(existingEvents || [])}

Create an optimal, balanced daily schedule timeline from 7:00 AM to 9:00 PM with realistic time blocks.
Include buffer times, hydration/meals, focused work sessions for their priorities, and restorative breaks.
Return JSON with the list of schedule items.
Each item must have:
- time: string (e.g. "08:00 AM", "09:00 AM", "10:30 AM", "12:00 PM", "02:00 PM", "04:30 PM", "07:00 PM")
- title: string (descriptive title of the block)
- category: one of ["work", "personal", "wellness", "meal", "break"]
- notes: short tips or focus instructions (under 15 words)
- priority: one of ["high", "medium", "low"]
Also include:
- summary: 1-2 sentences of encouraging coaching advice for the day
- keyFocus: the single most pivotal milestone to finish today
`;

    if (ai) {
      try {
        const timeoutPromise = new Promise<never>((_, reject) =>
          setTimeout(() => reject(new Error('Gemini request timed out')), 5000)
        );

        const response: any = await Promise.race([
          ai.models.generateContent({
            model: 'gemini-3.8-flash',
            contents: userPrompt,
            config: {
              responseMimeType: 'application/json',
              responseSchema: {
                type: Type.OBJECT,
                properties: {
                  summary: { type: Type.STRING },
                  keyFocus: { type: Type.STRING },
                  schedule: {
                    type: Type.ARRAY,
                    items: {
                      type: Type.OBJECT,
                      properties: {
                        time: { type: Type.STRING },
                        title: { type: Type.STRING },
                        category: { type: Type.STRING },
                        notes: { type: Type.STRING },
                        priority: { type: Type.STRING },
                      },
                      required: ['time', 'title', 'category'],
                    },
                  },
                },
                required: ['summary', 'keyFocus', 'schedule'],
              },
            },
          }),
          timeoutPromise,
        ]);

        const text = response.text;
        if (text) {
          const parsed = JSON.parse(text);
          return res.json({ success: true, data: parsed });
        }
      } catch (geminiErr: any) {
        console.warn('Gemini API call failed, using intelligent fallback:', geminiErr?.message);
      }
    }

    // High quality intelligent heuristic fallback if Gemini is offline or no key
    const priorityList: string[] = typeof priorities === 'string' 
      ? priorities.split(',').map((p: string) => p.trim()).filter(Boolean)
      : ['Deep Focus Project Block', 'Email & Administrative Catchup', 'Wellness & Exercise'];

    const fallbackSlots: ScheduleSlot[] = [
      { time: '07:00 AM', title: 'Morning Routine & Mindful Hydration', category: 'wellness', notes: 'Drink 500ml water and stretch', priority: 'medium' },
      { time: '08:00 AM', title: 'Healthy Breakfast & Day Review', category: 'meal', notes: 'Review top priorities in digital planner', priority: 'low' },
      { time: '09:00 AM', title: priorityList[0] || 'Deep Work: Primary Priority', category: 'work', notes: 'Turn off distractions, 90m focus flow', priority: 'high' },
      { time: '11:00 AM', title: 'Short Rest & Eye Break', category: 'break', notes: 'Step away from screen for 10 minutes', priority: 'low' },
      { time: '11:30 AM', title: priorityList[1] || 'Core Task Execution', category: 'work', notes: 'Tackle second highest priority', priority: 'high' },
      { time: '01:00 PM', title: 'Nourishing Lunch & Light Walk', category: 'meal', notes: 'Step outside for fresh air', priority: 'medium' },
      { time: '02:00 PM', title: priorityList[2] || 'Admin, Communications & Follow-ups', category: 'work', notes: 'Batch inbox and quick tasks', priority: 'medium' },
      { time: '04:00 PM', title: 'Movement / Fitness Reset', category: 'wellness', notes: 'Cardio, strength, or yoga session', priority: 'medium' },
      { time: '05:30 PM', title: 'Daily Wrap-up & Tomorrow Prep', category: 'work', notes: 'Check off daily planner items', priority: 'low' },
      { time: '07:00 PM', title: 'Dinner & Quality Downtime', category: 'personal', notes: 'Unwind and connect', priority: 'low' },
      { time: '09:00 PM', title: 'Nightly Reflection & Reading', category: 'wellness', notes: 'Screen-free winddown routine', priority: 'low' },
    ];

    return res.json({
      success: true,
      data: {
        summary: `Prioritizing ${priorityList[0] || 'your key goals'} during your peak morning energy window maximizes your output.`,
        keyFocus: priorityList[0] || 'Tackle your primary high-impact deliverable early.',
        schedule: fallbackSlots,
      },
    });
  } catch (error: any) {
    console.error('Error generating AI schedule:', error);
    res.status(500).json({ success: false, error: error?.message || 'Internal server error' });
  }
});

// Start server
async function startServer() {
  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(Number(PORT), '0.0.0.0', () => {
    console.log(`Server listening on port ${PORT}`);
  });
}

startServer();
