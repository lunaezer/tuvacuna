import Modal from "../Modal/Modal";
import Input from "../Input/Input";
import Button from "../Button/Button";



interface AgregarFamiliarModalProps{
     isOpen: boolean
  onClose: () => void
    handleSubmit: (e: React.FormEvent) => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function AgregarFamiliarModal({handleChange, onClose, isOpen, handleSubmit}:AgregarFamiliarModalProps){
return( 
<Modal isOpen={isOpen} onClose={onClose} titulo="Agrega a tu familiar"  >
    <h1 className="agregar-turno-titulo">Agregar familiar</h1>
    <form action="" onSubmit={handleSubmit}>
 <Input placeholder="familair@gmail.com" name="familiar" variant="large" onChange={handleChange} label="Mail del familiar" type="email" required/>
        <Button text="Cancelar" type="button" variant="primary" onClick={onClose}/>
          <Button variant="celeste" text="Agregar familiar" type="submit" ></Button>
 </form>
 </Modal>
 )
}