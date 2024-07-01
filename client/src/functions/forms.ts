
export const validateForm = (field: string, value: string | number) => {
    switch (field) {

      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!value){
            return('El email es obligatorio');
        }else if (typeof value === 'string' && !emailRegex.test(value)) {
            return('Formato de email inválido');
        } else {
            return(null);
        }

      case 'password':
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
        if(!value){
            return('La password es obligatorio');
        }else if (typeof value === 'string' && !passwordRegex.test(value)) {
            return('La contraseña debe tener al menos 6 caracteres, una letra mayúscula y una letra minúscula');
        } else {
            return(null);
        }
      
      case 'nombre':
        if(!field){
            return('El nombre es obligatorio');
        }else if (typeof value === 'string' && value.length > 18) {
            return('El nombre no puede superar los 18 caracteres');
        } else {
            return(null);
        }

      case 'apellido':
        if(!value){
            return('El apellido es obligatorio');
        }else if (typeof value === 'string' && value.length > 18) {
            return('El apellido no puede superar los 18 caracteres');
        } else {
            return(null);
        }

        case 'dni':
        if(!value){
            return('El dni es obligatorio');
        }else {
            return(null);
        }

        case 'domicilio':
        if(!value){
            return('El domicilio es obligatorio');
        }else {
            return(null);
        }

        case 'area':
        if(!value){
            return('El area es obligatorio');
        }else {
            return(null);
        }

        case 'telefono':
        if(!value){
            return('El teléfono es obligatorio');
        }else {
            return(null);
        }

      default:
        return(null);
    }
}