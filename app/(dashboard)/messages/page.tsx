'use client';

import React from 'react';
import Topbar from '@/components/topbar';
import Image from 'next/image';
import { 
  Send, 
  Camera, 
  Mic, 
  Paperclip, 
  Zap, 
  Plus, 
  MoreHorizontal,
  Circle
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'motion/react';

export default function MessagesPage() {
  const [message, setMessage] = React.useState('');

  return (
    <>
      <Topbar title="Communications Hub" subtitle="Status: Encrypted Feed" />
      
      <main className="pt-20 h-screen flex flex-col md:flex-row overflow-hidden">
        {/* Chat List - Hidden on small mobile or side bar */}
        <aside className="w-full md:w-80 lg:w-96 bg-[#0a0b0c] border-r border-white/5 flex flex-col pt-4 overflow-y-auto no-scrollbar">
          <div className="px-6 mb-6">
            <div className="bg-surface-container/40 p-1 rounded-sm border border-white/5 flex">
               <button className="flex-1 py-2 text-[10px] font-black uppercase tracking-widest text-primary bg-surface-container-highest rounded-sm">Active Directives</button>
               <button className="flex-1 py-2 text-[10px] font-black uppercase tracking-widest text-tertiary opacity-40 hover:opacity-100 transition-opacity">Archive</button>
            </div>
          </div>
          
          <div className="flex flex-col">
            <ChatTab active name="Coach Arya Chauhan" lastMsg="Every Rep. Every Meal. Every Win." time="09:42 AM" unread={2} />
            <ChatTab name="Kinetic Nutrition AI" lastMsg="Analysis complete: Increase protein by 12g." time="Yesterday" />
            <ChatTab name="MoveMentor Support" lastMsg="Your new mobility gear has shipped." time="MON" />
          </div>

          <div className="mt-auto p-6 border-t border-white/5">
             <button className="w-full py-4 border border-dashed border-white/10 text-[10px] font-black uppercase tracking-widest text-tertiary hover:border-primary/50 hover:text-primary transition-all flex items-center justify-center gap-2">
                <Plus className="w-4 h-4" /> Start New Directive
             </button>
          </div>
        </aside>

        {/* Chat Main View */}
        <section className="flex-1 bg-surface-container-lowest flex flex-col relative">
          {/* Chat Header */}
          <header className="h-16 px-8 flex justify-between items-center bg-surface-container-high/50 backdrop-blur-md border-b border-white/5 z-10">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-10 h-10 rounded-full overflow-hidden border border-primary/40 relative bg-surface-container-highest">
                  <Image
                    src="https://lh3.googleusercontent.com/aida/ADBb0uiHyJdfmTxEOQ43SBYqAIN3vKjAWkQRu_KvHMaX9b8Ql7NMp4V2Xbq8Lt_KjIpEotQMbSu0N618eAqq1k03hXNOU0-Dn51xKskUj8VYvCPdM_PDWgC0ryn3q7PgnhHWOl8oz5x05Tt4wWj5XxHLWy1S45dJw8vOL4s8U-f1RCUeq06aAnrKwTDr9Ddvkdxdqg94LhbnY02YNNQou6j-k_amY0nDZKdc6rB0zbmL_s-3TFZdtzeSPWRtFq6iwium2ecymYoBXkyEKQ"
                    alt="Coach"
                    fill
                    className="object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <Circle className="absolute -bottom-0.5 -right-0.5 w-3 h-3 text-primary fill-current ring-2 ring-background ring-offset-0" />
              </div>
              <div>
                <h3 className="text-sm font-black text-on-surface uppercase font-display tracking-tight leading-none mb-1 text-white">Arya Chauhan</h3>
                <p className="text-[10px] text-primary font-bold uppercase tracking-widest">Active Specialist</p>
              </div>
            </div>
            <button className="text-tertiary hover:text-white transition-colors">
              <MoreHorizontal className="w-5 h-5" />
            </button>
          </header>

          {/* Messages Feed */}
          <div className="flex-1 overflow-y-auto no-scrollbar p-8 space-y-8 pb-32">
            <div className="flex justify-center mb-8">
              <span className="px-4 py-1.5 bg-white/5 text-[9px] font-black tracking-widest text-tertiary uppercase rounded-full border border-white/5">Protocol Initialization: Monday Oct 15</span>
            </div>

            <Message 
              sender="Arya Chauhan" 
              time="09:40 AM" 
              text="Good morning, Arya. Just reviewed your training data from Sunday. We need to focus more on your eccentric control for the deadlifts today. I&apos;ve updated your mission protocol."
              avatar="https://lh3.googleusercontent.com/aida/ADBb0uiHyJdfmTxEOQ43SBYqAIN3vKjAWkQRu_KvHMaX9b8Ql7NMp4V2Xbq8Lt_KjIpEotQMbSu0N618eAqq1k03hXNOU0-Dn51xKskUj8VYvCPdM_PDWgC0ryn3q7PgnhHWOl8oz5x05Tt4wWj5XxHLWy1S45dJw8vOL4s8U-f1RCUeq06aAnrKwTDr9Ddvkdxdqg94LhbnY02YNNQou6j-k_amY0nDZKdc6rB0zbmL_s-3TFZdtzeSPWRtFq6iwium2ecymYoBXkyEKQ"
              isCoach
            />

            <Message 
              sender="Me" 
              time="09:42 AM" 
              text="Understood, Coach. Feeling a bit of tightness in my left glute, should I modify the volume?"
              isMe
            />

            <Message 
              sender="Arya Chauhan" 
              time="09:45 AM" 
              text="Let&apos;s reduce the primary load by 10% and do an extra 2 sets of nerve glides before we start. Updated that for you now."
              avatar="https://lh3.googleusercontent.com/aida/ADBb0uiHyJdfmTxEOQ43SBYqAIN3vKjAWkQRu_KvHMaX9b8Ql7NMp4V2Xbq8Lt_KjIpEotQMbSu0N618eAqq1k03hXNOU0-Dn51xKskUj8VYvCPdM_PDWgC0ryn3q7PgnhHWOl8oz5x05Tt4wWj5XxHLWy1S45dJw8vOL4s8U-f1RCUeq06aAnrKwTDr9Ddvkdxdqg94LhbnY02YNNQou6j-k_amY0nDZKdc6rB0zbmL_s-3TFZdtzeSPWRtFq6iwium2ecymYoBXkyEKQ"
              isCoach
            />

            <div className="flex items-center gap-4 border-y border-white/5 py-4 my-8">
               <Zap className="text-secondary w-5 h-5 fill-current" />
               <p className="text-[10px] font-sans italic text-secondary uppercase tracking-widest font-bold">
                 System: Your Movement Protocol has been updated by Coach Arya.
               </p>
            </div>
          </div>

          {/* Input Area */}
          <div className="absolute bottom-6 left-6 right-6 z-20">
            <div className="bg-surface-container-high/80 backdrop-blur-2xl p-2 rounded-sm border border-white/5 flex gap-2 items-end shadow-2xl">
              <div className="flex gap-1 mb-1">
                <InputButton icon={Plus} />
                <InputButton icon={Camera} />
              </div>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="MESSAGE MOVEMENTOR..."
                className="flex-1 bg-transparent border-none focus:ring-0 text-[11px] font-bold uppercase tracking-widest text-on-surface py-3 resize-none max-h-32 no-scrollbar"
                rows={1}
              />
              <div className="flex gap-1 mb-1">
                <InputButton icon={Mic} />
                <button 
                  className={cn(
                    "w-10 h-10 rounded-sm flex items-center justify-center transition-all duration-300",
                    message.length > 0 ? "bg-primary text-on-primary shadow-[0_0_15px_rgba(189,209,36,0.5)]" : "bg-surface-container-highest text-tertiary"
                  )}
                >
                  <Send className="w-5 h-5 fill-current" />
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

function ChatTab({ active, name, lastMsg, time, unread }: { active?: boolean; name: string; lastMsg: string, time: string, unread?: number }) {
  return (
    <div className={cn(
      "px-6 py-6 border-l-4 transition-all duration-300 cursor-pointer group hover:bg-surface-container/50",
      active ? "bg-surface-container/20 border-primary" : "border-transparent"
    )}>
      <div className="flex justify-between items-start mb-2">
        <h4 className={cn("text-[10px] font-black uppercase tracking-widest transition-colors", active ? "text-white" : "text-tertiary group-hover:text-white")}>{name}</h4>
        <div className="flex flex-col items-end gap-1">
           <span className="text-[8px] font-bold text-tertiary uppercase tracking-wider opacity-60">{time}</span>
           {unread && <span className="bg-primary text-on-primary w-4 h-4 rounded-full flex items-center justify-center text-[8px] font-black animate-pulse">{unread}</span>}
        </div>
      </div>
      <p className="text-xs text-tertiary font-sans italic truncate opacity-70 leading-relaxed">&quot;{lastMsg}&quot;</p>
    </div>
  );
}

function Message({ sender, time, text, avatar, isCoach, isMe }: { sender: string; time: string; text: string; avatar?: string; isCoach?: boolean, isMe?: boolean }) {
  return (
    <div className={cn("flex gap-4 max-w-2xl", isMe ? "ml-auto flex-row-reverse" : "")}>
      {!isMe && (
        <div className="w-10 h-10 rounded-full overflow-hidden border border-white/10 shrink-0 relative bg-surface-container-high">
          {avatar && <Image src={avatar} alt={sender} fill className="object-cover grayscale" referrerPolicy="no-referrer" />}
        </div>
      )}
      <div className={cn("flex flex-col", isMe ? "items-end text-right" : "items-start")}>
        <div className="flex items-center gap-2 mb-2">
          <span className="text-[10px] font-black uppercase tracking-widest text-primary font-display">{sender}</span>
          <span className="text-[8px] font-bold text-tertiary/40 uppercase tracking-widest">{time}</span>
        </div>
        <div className={cn(
          "p-5 rounded-sm text-sm font-sans relative overflow-hidden",
          isMe ? "bg-white/5 text-on-surface text-tertiary border border-white/5 italic" : "bg-surface-container-highest text-white border-l-2 border-primary shadow-xl"
        )}>
           {isCoach && <Zap className="absolute top-0 right-0 w-16 h-16 text-primary opacity-5 -translate-y-8 translate-x-8" />}
           <p className="relative z-10 leading-relaxed font-medium">{text}</p>
        </div>
      </div>
    </div>
  );
}

function InputButton({ icon: Icon }: { icon: any }) {
  return (
    <button className="w-10 h-10 rounded-sm flex items-center justify-center text-tertiary hover:bg-surface-container-highest hover:text-white transition-all">
      <Icon className="w-5 h-5" />
    </button>
  );
}
