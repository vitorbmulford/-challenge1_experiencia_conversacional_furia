import { Zap, Users, Settings, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Sidebar() {
    return (
        <aside className="w-64 bg-gray-800/50 border-r border-indigo-700/30 p-4 hidden md:block">
            <div className="space-y-6">
                <div className="space-y-2">
                    <h3 className="font-barlow-condensed text-xl text-indigo-500 px-2">COMANDOS</h3>
                    {[
                        { icon: <Zap className="h-4 w-4" />, label: 'Destaques' },
                        { icon: <Users className="h-4 w-4" />, label: 'Jogadores' },
                        { icon: <MessageSquare className="h-4 w-4" />, label: 'Estratégias' },
                    ].map((item, index) => (
                        <Button
                            key={index}
                            variant="ghost"
                            className="w-full justify-start text-gray-300 hover:text-indigo-500"
                        >
                            {item.icon}
                            <span className="ml-2">{item.label}</span>
                        </Button>
                    ))}
                </div>

                <div className="border-t border-indigo-700/20 pt-4">
                    <Button variant="ghost" className="text-gray-400 hover:text-indigo-500">
                        <Settings className="h-4 w-4 mr-2" />
                        Configurações
                    </Button>
                </div>
            </div>
        </aside>
    );
}
