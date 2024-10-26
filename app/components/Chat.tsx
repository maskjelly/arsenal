// "use client";

// import React from "react";
// import { useCompletion } from "ai/react";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Separator } from "@/components/ui/separator";
// import {
//   ArrowUp,
//   ChevronDown,
//   MoreHorizontal,
// } from "lucide-react";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { Switch } from "@/components/ui/switch";

// const Header = React.memo(({ username = "User" }: { username?: string }) => (
//   <div className="flex items-center justify-between p-2 bg-background border-b border-border">
//     <div className="flex items-center space-x-2">
//       <Avatar className="h-8 w-8">
//         <AvatarImage src="/placeholder-avatar.jpg" alt={username} />
//         <AvatarFallback>{username[0]}</AvatarFallback>
//       </Avatar>
//       <span className="font-semibold text-sm text-foreground">{username}</span>
//       <span className="text-xs text-muted-foreground">Now</span>
//     </div>
//     <div className="flex items-center space-x-2">
//       <Button
//         variant="ghost"
//         size="sm"
//         className="text-muted-foreground hover:text-foreground"
//       >
//         + Space
//       </Button>
//       <Separator orientation="vertical" className="h-6" />
//       <span className="text-sm font-medium text-foreground">AI Chat</span>
//     </div>
//     <Button
//       variant="ghost"
//       size="icon"
//       className="text-muted-foreground hover:text-foreground"
//     >
//       <MoreHorizontal className="h-4 w-4" />
//     </Button>
//   </div>
// ));

// const ChatInput = React.memo(({ onSubmit, isLoading, value, onChange }: {
//   onSubmit: (e: React.FormEvent) => void;
//   isLoading: boolean;
//   value: string;
//   onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
// }) => (
//   <div className="border-t border-border p-4 bg-background">
//     <form onSubmit={onSubmit} className="flex items-center space-x-2">
//       <Input
//         placeholder="Ask a question..."
//         value={value}
//         onChange={onChange}
//         className="flex-grow bg-input text-foreground btn-primary"
//       />
//       <DropdownMenu>
//         <DropdownMenuTrigger asChild>
//           <Button variant="outline" size="icon">
//             <ChevronDown className="h-4 w-4" />
//           </Button>
//         </DropdownMenuTrigger>
//         <DropdownMenuContent>
//           <DropdownMenuItem>
//             <span className="text-foreground">Pro</span>
//             <Switch className="ml-auto" />
//           </DropdownMenuItem>
//         </DropdownMenuContent>
//       </DropdownMenu>
//       <Button type="submit" size="icon" disabled={isLoading}>
//         {isLoading ? (
//           <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-foreground" />
//         ) : (
//           <ArrowUp className="h-4 w-4" />
//         )}
//       </Button>
//     </form>
//   </div>
// ));

// export default function PerplexityChat() {
//   const {
//     input,
//     isLoading,
//     handleInputChange,
//     handleSubmit,
//   } = useCompletion({
//     api: "/api/completion",
//   });

//   const handleFormSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!input.trim()) return;
//     handleSubmit(e);
//   };

//   return (
//     <div className="flex flex-col h-screen bg-background text-foreground">
//       <Header />
//       <div className="flex-1 overflow-hidden bg-background" />
//       <ChatInput
//         onSubmit={handleFormSubmit}
//         isLoading={isLoading}
//         value={input}
//         onChange={handleInputChange}
//       />
//     </div>
//   );
// }