export interface Event {
    name: string;
    category: number;
    startDateTime: string;
    endDateTime: string;
    description: string;
    summary: string;
    link: string;
    linkName: string;
    status?: number;
}
  
export interface EventCardProps {
    events: Event[];
}