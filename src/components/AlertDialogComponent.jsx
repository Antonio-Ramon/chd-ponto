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

export default function AlertDialogComponent({ dados, isRegister = true }) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button type="submit" className="w-full">
          { isRegister ? "Registrar" : "Bater Ponto" }
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{dados.message}</AlertDialogTitle>
          
          <AlertDialogDescription>
            { isRegister 
              ? "Por favor anote o seu ID de funcionário pois será necessário para bater o ponto" 
              : "Ponto registrado" 
            }
            <br/>
            { isRegister ? <span>Seu ID: <b>{dados.employeeId}</b></span> : <span>Data: {dados.dateTime}</span> }
            
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction>Confirmar</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
