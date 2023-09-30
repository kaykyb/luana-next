import React from "react";

export default function QuizLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container mx-auto px-4">
      <header className="py-6 border-b">
        <span className="font-display text-2xl">Fluidform</span>
      </header>
      {children}
      <footer className="py-4"></footer>
    </div>
  );
}
