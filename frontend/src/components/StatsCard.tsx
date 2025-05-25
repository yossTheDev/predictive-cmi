import React, { ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Props {
  title: string;
  subtitle: string;
  logo?: ReactNode;
}

export const StatsCard: React.FC<Props> = ({ title, logo, subtitle }) => {
  return (
    <>
      <Card className="w-64 flex flex-col">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">{title}</CardTitle>
          {logo && (
            <div className="h-4 w-4 ml-2 text-muted-foreground">{logo}</div>
          )}
        </CardHeader>
        <CardContent className="flex h-full items-end mt-auto">
          <div className="text-2xl font-bold mt-auto">{subtitle}</div>
          <p className="text-xs text-muted-foreground hidden"></p>
        </CardContent>
      </Card>
    </>
  );
};
