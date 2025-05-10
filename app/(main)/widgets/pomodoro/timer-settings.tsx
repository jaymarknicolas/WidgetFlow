"use client";

import { useState } from "react";
import { Save, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

interface TimerSettings {
  work: number;
  shortBreak: number;
  longBreak: number;
  autoStartBreaks: boolean;
  autoStartPomodoros: boolean;
}

interface TimerSettingsProps {
  settings: TimerSettings;
  onSave: (settings: TimerSettings) => void;
  onCancel: () => void;
}

export function TimerSettings({
  settings,
  onSave,
  onCancel,
}: TimerSettingsProps) {
  const [localSettings, setLocalSettings] = useState<TimerSettings>({
    ...settings,
  });

  const handleInputChange = (
    field: keyof TimerSettings,
    value: string | boolean
  ) => {
    if (typeof value === "string") {
      // Convert string to number and ensure it's within valid range (1-60)
      const numValue = Number.parseInt(value);
      const validValue = isNaN(numValue)
        ? 1
        : Math.min(Math.max(numValue, 1), 60);

      setLocalSettings({
        ...localSettings,
        [field]: validValue,
      });
    } else {
      setLocalSettings({
        ...localSettings,
        [field]: value,
      });
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Timer Settings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="workDuration">Work Duration (minutes)</Label>
          <Input
            id="workDuration"
            type="number"
            min="1"
            max="60"
            value={localSettings.work}
            onChange={(e) => handleInputChange("work", e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="shortBreakDuration">
            Short Break Duration (minutes)
          </Label>
          <Input
            id="shortBreakDuration"
            type="number"
            min="1"
            max="60"
            value={localSettings.shortBreak}
            onChange={(e) => handleInputChange("shortBreak", e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="longBreakDuration">
            Long Break Duration (minutes)
          </Label>
          <Input
            id="longBreakDuration"
            type="number"
            min="1"
            max="60"
            value={localSettings.longBreak}
            onChange={(e) => handleInputChange("longBreak", e.target.value)}
          />
        </div>
        <div className="flex items-center justify-between">
          <Label htmlFor="autoStartBreaks">Auto-start Breaks</Label>
          <Switch
            id="autoStartBreaks"
            checked={localSettings.autoStartBreaks}
            onCheckedChange={(checked) =>
              handleInputChange("autoStartBreaks", checked)
            }
          />
        </div>
        <div className="flex items-center justify-between">
          <Label htmlFor="autoStartPomodoros">Auto-start Pomodoros</Label>
          <Switch
            id="autoStartPomodoros"
            checked={localSettings.autoStartPomodoros}
            onCheckedChange={(checked) =>
              handleInputChange("autoStartPomodoros", checked)
            }
          />
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={onCancel}>
          <X className="h-4 w-4 mr-2" />
          Cancel
        </Button>
        <Button onClick={() => onSave(localSettings)}>
          <Save className="h-4 w-4 mr-2" />
          Save Settings
        </Button>
      </CardFooter>
    </Card>
  );
}
