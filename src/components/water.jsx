import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/tabs';
import { Button } from './ui/tabs';
import { Droplets, Plus, Minus } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const WaterIntakeCard = ({ timeframe = 'daily', onWaterIntakeChange = () => {} }) => {
  const [waterIntake, setWaterIntake] = useState(6);

  const waterData = {
    daily: [
      { date: 'Mon', cups: 8 },
      { date: 'Tue', cups: 6 },
      { date: 'Wed', cups: 7 },
      { date: 'Thu', cups: 6 },
      { date: 'Fri', cups: 8 },
      { date: 'Sat', cups: 5 },
      { date: 'Sun', cups: waterIntake },
    ],
    weekly: [
      { date: 'Week 1', cups: 42 },
      { date: 'Week 2', cups: 39 },
      { date: 'Week 3', cups: 45 },
      { date: 'Week 4', cups: 40 },
    ],
    monthly: [
      { date: 'Jan', cups: 180 },
      { date: 'Feb', cups: 165 },
      { date: 'Mar', cups: 190 },
      { date: 'Apr', cups: 175 },
    ],
  };

  const handleIncrease = () => {
    const newIntake = waterIntake + 1;
    setWaterIntake(newIntake);
    onWaterIntakeChange(newIntake);
  };

  const handleDecrease = () => {
    if (waterIntake > 0) {
      const newIntake = waterIntake - 1;
      setWaterIntake(newIntake);
      onWaterIntakeChange(newIntake);
    }
  };

  return (
    <Card className="bg-slate-800/90 border-slate-700 shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-medium text-white">Water Intake</CardTitle>
        <Droplets className="h-5 w-5 text-blue-500" />
      </CardHeader>
      <div className="px-6">
        <div className="h-px w-full bg-slate-700" />
      </div>
      <CardContent className="mt-4">
        <div className="flex flex-col space-y-4">
          {/* Controls */}
          <div className="flex items-center justify-between bg-slate-700/50 p-4 rounded-lg">
            <Button
              onClick={handleDecrease}
              variant="ghost"
              className="text-slate-200 hover:text-blue-400 hover:bg-slate-600/50"
            >
              <Minus className="h-5 w-5" />
            </Button>
            <div className="flex items-center gap-2">
              <Droplets className="h-6 w-6 text-blue-400" />
              <span className="text-2xl font-bold text-blue-400">{waterIntake}</span>
              <span className="text-sm text-slate-300">cups</span>
            </div>
            <Button
              onClick={handleIncrease}
              variant="ghost"
              className="text-slate-200 hover:text-blue-400 hover:bg-slate-600/50"
            >
              <Plus className="h-5 w-5" />
            </Button>
          </div>

          {/* Chart */}
          <div className="h-[200px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={waterData[timeframe]}>
                <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
                <XAxis
                  dataKey="date"
                  stroke="#94a3b8"
                  tick={{ fill: '#94a3b8' }}
                />
                <YAxis
                  stroke="#94a3b8"
                  tick={{ fill: '#94a3b8' }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1e293b',
                    border: 'none',
                    borderRadius: '8px',
                    color: '#94a3b8'
                  }}
                  labelStyle={{ color: '#94a3b8' }}
                />
                <Line
                  type="monotone"
                  dataKey="cups"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  dot={{ fill: '#3b82f6' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Daily target indicator */}
          <div className="flex justify-between items-center text-sm px-2">
            <span className="text-slate-300">Daily Target:</span>
            <span className={`font-medium ${waterIntake >= 8 ? 'text-green-500' : 'text-orange-500'}`}>
              {waterIntake}/8 cups
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WaterIntakeCard;