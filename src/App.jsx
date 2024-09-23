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
import AlertDialogComponent from "@/components/AlertDialogComponent";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import axios from "axios";
import { Button } from "./components/ui/button";

export default function App() {
  const [funcionarioId, setFuncionarioId] = useState("");
  const [funcionarioName, setFuncionarioName] = useState("");
  const [dados, setDados] = useState("");

  const registerEmployee = async (e) => {
    e.preventDefault();

    const data = {
      name: funcionarioName,
    };

    setFuncionarioName("");

    try {
      // Enviando a requisição POST
      const response = await axios.post(
        "http://localhost:8080/funcionarios",
        data
      );

      setDados(response.data);
    } catch (error) {
      console.error("Erro na requisição:", error);
    }
  };

  const registerPoint = async (e) => {
    e.preventDefault();

    const data = {
      funcionario_id: funcionarioId,
    };

    setFuncionarioId("");

    try {
      // Enviando a requisição POST
      const response = await axios.post(
        "http://localhost:8080/registro_ponto",
        data
      );

      if (response.data) {
        setDados(response.data);
      } else {
        console.log("Erro na requisição. Response: " + response.data);
      }
    } catch (error) {
      const message = error.response.data.message;
      if (message == "Funcionário não encontrado") {
        setDados(message);
      } else {
        console.error("Erro na requisição:", error);
      }
    }
  };

  const getAllFuncionarios = async () => {
    try {
      const response = await axios.get("http://localhost:8080/funcionarios");

      if (response.data) {
        setDados(response.data);
      } else {
        console.error("Nenhum dado retornada da API.");
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
    }
  };
  const getAllPontoRegistros = async () => {
    try {
      const response = await axios.get("http://localhost:8080/registro_ponto");

      if (response.data) {
        setDados(response.data);
      } else {
        console.error("Nenhum dado retornada da API.");
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
    }
  };

  const cleanStates = () => {
    setFuncionarioId("");
    setFuncionarioName("");
  };

  return (
    <>
      <h1 className="font-bold text-center m-10 text-2xl">CHD Ponto Digital</h1>
      <Tabs
        defaultValue="point-record"
        className="w-max"
        onValueChange={(value) => {
          if (value === "funcionarios") {
            getAllFuncionarios();
          } else if (value === "registro_ponto") {
            getAllPontoRegistros();
          }
        }}
      >
        <TabsList className="flex justify-center space-x-2">
          <TabsTrigger value="point-record">Bater Ponto</TabsTrigger>
          <TabsTrigger value="register-user">
            Cadastro de Funcionários
          </TabsTrigger>
          <TabsTrigger value="funcionarios">Funcionários</TabsTrigger>
          <TabsTrigger value="registro_ponto">Pontos Cadastrados</TabsTrigger>
        </TabsList>
        {/* REGISTRAR PONTO */}
        <TabsContent value="point-record">
          <Card className="w-full mx-auto">
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
                <AlertDialogComponent
                  dados={dados}
                  isRegister={false}
                  cleanStates={cleanStates}
                />
              </CardFooter>
            </form>
          </Card>
        </TabsContent>

        {/* CADASTRO DE FUNCIONÁRIO */}
        <TabsContent value="register-user">
          <Card className="w-full mx-auto">
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
                <AlertDialogComponent dados={dados} cleanStates={cleanStates} />
              </CardFooter>
            </form>
          </Card>
        </TabsContent>

        {/* TABELA FUNCIONÁRIOS */}
        <TabsContent value="funcionarios">
          <Card className="w-full mx-auto">
            <CardHeader>
              <CardTitle>Funcionários</CardTitle>
              <CardDescription>
                Aqui ficam todos os funcionários cadastrados.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">ID</TableHead>
                    <TableHead>Funcionário</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {Array.isArray(dados) &&
                    dados.map((funcionario, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">
                          {funcionario.funcionario_id}
                        </TableCell>
                        <TableCell>{funcionario.name}</TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* TABELA REGISTROS */}
        <TabsContent value="registro_ponto">
          <Card className="w-full mx-auto">
            <CardHeader>
              <CardTitle>Registro de Pontos</CardTitle>
              <CardDescription>
                Aqui ficam todos os registros de pontos.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">ID do Ponto</TableHead>
                    <TableHead>Funcionário</TableHead>
                    <TableHead>Entrada</TableHead>
                    <TableHead>Saída</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {Array.isArray(dados) &&
                    dados.map((ponto, index) => (
                      <TableRow key={index}>
                        <TableCell>{ponto.pontoId}</TableCell>
                        <TableCell>
                          {ponto.funcionario
                            ? ponto.funcionario.name
                            : "Desconhecido"}
                        </TableCell>
                        <TableCell>{ponto.dataEntradaConverted}</TableCell>
                        <TableCell>{ponto.dataSaidaConverted}</TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </>
  );
}
