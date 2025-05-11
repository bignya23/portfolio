export interface Message {
  id: string;
  text: string;
  sender: string;
  timestamp: Date;
  links?: { main_link: string; link_name: string }[];
}
export interface ChatResponse {
  reply: string;
}