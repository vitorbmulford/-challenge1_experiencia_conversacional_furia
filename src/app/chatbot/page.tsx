import ChatInterface from './components/chat-ui';
import Sidebar from './components/sidebar';

export default function ChatbotPage() {
    return (
        <div className="flex flex-col min-h-screen bg-black text-white">

            <div className="flex flex-1 overflow-hidden">
                <Sidebar />

                <main className="flex-1 flex flex-col border-l border-red-900/30">
                    <ChatInterface />
                </main>
            </div>
        </div>
    );
}