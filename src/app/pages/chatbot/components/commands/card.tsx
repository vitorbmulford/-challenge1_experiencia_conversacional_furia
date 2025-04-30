import { type Command } from './data';

export function CommandCard({ command }: { command: Command }) {
    return (
        <div className="p-4 bg-gray-900/50 border border-red-900/30 rounded-lg hover:border-red-500 transition-colors">
            <div className="flex items-start gap-3">
                <div className="bg-red-900/20 px-2 py-1 rounded-md text-red-400 font-mono text-sm">
                    {command.name}
                </div>
                <span className="text-xs text-gray-400 mt-1">{command.category}</span>
            </div>
            <p className="mt-2 text-gray-300">{command.description}</p>
            <div className="mt-3">
                <p className="text-xs text-gray-500">Como usar:</p>
                <code className="block mt-1 p-2 bg-black text-red-400 rounded text-sm font-mono">
                    {command.usage}
                </code>
            </div>
        </div>
    );
}