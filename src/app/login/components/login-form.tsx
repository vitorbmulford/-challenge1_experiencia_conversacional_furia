"use client"; // Necessário para hooks/eventos

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";

// Schema de validação
const formSchema = z.object({
    email: z.string().email("E-mail inválido"),
    password: z.string().min(6, "Senha deve ter 6+ caracteres"),
});

export function LoginForm() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: { email: "", password: "" },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log("Dados do login:", values);
        // Lógica de autenticação aqui (ex.: Auth.js, Firebase, etc.)
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-gray-300">E-mail</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="seu@email.com"
                                    className="bg-[#1c2a3d] border-[#2d3d53] text-white focus:border-blue-500"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage className="text-red-500" />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-gray-300">Senha</FormLabel>
                            <FormControl>
                                <Input
                                    type="password"
                                    placeholder="••••••"
                                    className="bg-[#1c2a3d] border-[#2d3d53] text-white focus:border-blue-500"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage className="text-red-500" />
                        </FormItem>
                    )}
                />
                <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-500 to-blue-700 hover:bg-gradient-to-l font-barlow-condensed text-lg text-white shadow-lg"
                >
                    ENTRAR
                </Button>
            </form>
        </Form>
    );
}
