import React from "react";

export default function EventDetails({ params }: { params: { eventId: string } }) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      Details about event {params.eventId}
    </main>
  );
}
