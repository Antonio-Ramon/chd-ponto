import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

export default function AlertDialogComponent({
  dados,
  isRegister = true,
  cleanStates,
}) {
  const codeDeggunging = () => {
    console.log(dados != "");
    console.log(dados);
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button type="submit" className="w-full" onClick={codeDeggunging}>
          {isRegister ? "Registrar" : "Bater Ponto"}
        </Button>
      </AlertDialogTrigger>
      {dados != "" || dados == "Funcionário não encontrado" ? (
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {dados == "Funcionário não encontrado"
                ? "Funcionário não encontrado"
                : dados.message}
            </AlertDialogTitle>

            <AlertDialogDescription>
              {dados == "Funcionário não encontrado" ? (
                "Por favor, coloque um ID correto."
              ) : (
                <>
                  {isRegister
                    ? "Por favor anote o seu ID de funcionário pois será necessário para bater o ponto"
                    : "Ponto registrado"}
                  <br />
                  {isRegister ? (
                    <span>
                      Seu ID: <b>{dados.employeeId}</b>
                    </span>
                  ) : (
                    <span>Data: {dados.dateTime}</span>
                  )}
                </>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={cleanStates}>
              Confirmar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      ) : (
        ""
      )}
    </AlertDialog>
  );
}
