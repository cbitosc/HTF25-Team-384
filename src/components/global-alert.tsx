
"use client";

import { useEffect, useState } from 'react';
import type { AIPoweredPreventiveNudgesOutput } from '@/ai/flows/ai-powered-preventive-nudges';
import { aiPoweredPreventiveNudges } from '@/ai/flows/ai-powered-preventive-nudges';
import { mockHealthData } from '@/lib/data';
import { PreventiveNudgeAlert } from '@/components/preventive-nudge-alert';

export function GlobalAlert() {
    const [nudgeData, setNudgeData] = useState<AIPoweredPreventiveNudgesOutput | null>(null);

    useEffect(() => {
        async function fetchNudgeData() {
            try {
                const data = await aiPoweredPreventiveNudges(mockHealthData);
                setNudgeData(data);
            } catch (error) {
                console.error("Failed to fetch nudge data:", error);
                setNudgeData(null);
            }
        }
        fetchNudgeData();
    }, []);

    if (!nudgeData?.shouldAlert) {
        return null;
    }

    return (
        <div className="p-4 bg-secondary/50">
            <PreventiveNudgeAlert message={nudgeData.alertMessage} />
        </div>
    );
}
