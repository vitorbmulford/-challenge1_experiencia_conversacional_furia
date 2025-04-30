'use client';

import { useState } from 'react';
import { COMMANDS } from './data';
import { CommandCard } from './card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

export function CommandsList() {
    const [search, setSearch] = useState('');

    const filteredCommands = COMMANDS.filter(cmd =>
        cmd.name.toLowerCase().includes(search.toLowerCase()) ||
        cmd.description.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <Input
                placeholder="Buscar comandos..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="bg-gray-900 border-red-900/50"
            />

            <Tabs defaultValue="all" className="w-full">
                <TabsList className="grid grid-cols-4 bg-gray-900/50">
                    <TabsTrigger value="all">Todos</TabsTrigger>
                    <TabsTrigger value="jogadores">Jogadores</TabsTrigger>
                    <TabsTrigger value="partidas">Partidas</TabsTrigger>
                    <TabsTrigger value="estatísticas">Estatísticas</TabsTrigger>
                </TabsList>

                <TabsContent value="all" className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    {filteredCommands.map((cmd) => (
                        <CommandCard key={cmd.name} command={cmd} />
                    ))}
                </TabsContent>

                {['jogadores', 'partidas', 'estatísticas'].map((category) => (
                    <TabsContent key={category} value={category} className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        {filteredCommands
                            .filter(cmd => cmd.category === category)
                            .map((cmd) => (
                                <CommandCard key={cmd.name} command={cmd} />
                            ))}
                    </TabsContent>
                ))}
            </Tabs>
        </div>
    );
}