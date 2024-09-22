import { useState } from "react";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
	CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import AlertDialogComponent from "./components/AlertDialogComponent";

import axios from "axios";

export default function App() {
	const [funcionarioId, setFuncionarioId] = useState("");
	const [funcionarioName, setFuncionarioName] = useState("");
  const [dados, setDados] = useState("");

	const registerEmployee = async (e) => {
		e.preventDefault();

    const data = {
      "name": funcionarioName,
    }

    // event.target.value = ''

    setFuncionarioName('')

    try {
      // Enviando a requisição POST
      const response = await axios.post('http://localhost:8080/funcionarios', data);

      setDados(response.data);


    } catch (error) {
      console.error('Erro na requisição:', error);
    }
    
	
	};


  const registerPoint = async (e) => {
		e.preventDefault();

    const data = {
      "funcionario_id": funcionarioId,
    }

    // event.target.value = ''

    setFuncionarioId('')

    try {
      // Enviando a requisição POST
      const response = await axios.post('http://localhost:8080/registro_ponto', data);

      setDados(response.data);


    } catch (error) {
      console.error('Erro na requisição:', error);
    }
    
	
	};
	return (
		<>
			<h1 className="font-bold text-center m-10 text-2xl">CHD Ponto Digital</h1>
			<Tabs defaultValue="point-record" className="w-[400px]">
				<TabsList className="flex justify-center space-x-2">
					<TabsTrigger value="point-record">Registro de Ponto</TabsTrigger>
					<TabsTrigger value="register-user">
						Cadastro de Funcionários
					</TabsTrigger>
				</TabsList>
        {/* REGISTRAR PONTO */}
				<TabsContent value="point-record">
					<Card className="w-full max-w-md mx-auto">
						<CardHeader>
							<CardTitle>Registro de Ponto</CardTitle>
							<CardDescription>
								Insira seu ID para registrar o ponto
							</CardDescription>
						</CardHeader>
						<form onSubmit={registerPoint}>
							<CardContent className="space-y-4">
								<div className="space-y-2">
									<Label htmlFor="funcionarioId">ID do Funcionário</Label>
									<Input
										id="funcionarioId"
										placeholder="Digite seu ID"
										value={funcionarioId}
										onChange={(e) => setFuncionarioId(e.target.value)}
										required
									/>
								</div>
							</CardContent>
							<CardFooter>
                <AlertDialogComponent dados={dados} isRegister={false} />
							</CardFooter>
						</form>
					</Card>
				</TabsContent>

        {/* CADASTRO DE FUNCIONÁRIO */}
				<TabsContent value="register-user">
					<Card className="w-full max-w-md mx-auto">
						<CardHeader>
							<CardTitle>Cadastro de Funcionários</CardTitle>
							<CardDescription>
								Insira nome completo do funcionário que deseja cadastrar.
							</CardDescription>
						</CardHeader>
						<form onSubmit={registerEmployee}>
							<CardContent className="space-y-4">
								<div className="space-y-2">
									<Label htmlFor="nome">Nome do Funcionário</Label>
									<Input
										id="nome"
										placeholder="Digite seu nome completo"
										value={funcionarioName}
										onChange={(e) => setFuncionarioName(e.target.value)}
										required
									/>
								</div>
							</CardContent>
							<CardFooter>
                <AlertDialogComponent dados={dados} />
							</CardFooter>
						</form>
					</Card>
				</TabsContent>
			</Tabs>
		</>
	);
}
