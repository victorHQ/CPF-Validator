// CPF Validation Class
class ValidaCPF {
  constructor(cpfEnviado) {
    Object.defineProperty(this, 'cpfLimpo', {
      writable: false,
      enumerable: true,
      configurable: false,
      value: cpfEnviado.replace(/\D+/g, ''),
    });
  }

  sequencia() {
    return (
      this.cpfLimpo.charAt(0).repeat(this.cpfLimpo.length) === this.cpfLimpo
    );
  }

  geraNovoCpf() {
    const cpfSemDigitos = this.cpfLimpo.slice(0, -2);
    const digito1 = ValidaCPF.geraDigito(cpfSemDigitos);
    const digito2 = ValidaCPF.geraDigito(cpfSemDigitos + digito1);
    this.novoCPF = cpfSemDigitos + digito1 + digito2;
  }

  static geraDigito(cpfSemDigitos) {
    let total = 0;
    let reverso = cpfSemDigitos.length + 1;

    for (let stringNumerica of cpfSemDigitos) {
      total += reverso * Number(stringNumerica);
      reverso--;
    }

    const digito = 11 - (total % 11);
    return digito <= 9 ? String(digito) : "0";
  }

  valida() {
    if (!this.cpfLimpo) return false;
    if (typeof this.cpfLimpo !== "string") return false;
    if (this.cpfLimpo.length !== 11) return false;
    if (this.sequencia()) return false;
    this.geraNovoCpf();

    return this.novoCPF === this.cpfLimpo;
  }
}

// CPF Creation Class
class CreateCPF{
  constructor(){
    Object.defineProperty(this, 'cpfCriado', {
      writable: false,
      enumerable: true,
      configurable: false,
      value: String(CreateCPF.createArrayCpf()),
    });
  }

  static createArrayCpf(){
    const create_array = (total, numero) => Array.from(Array(total), () => number_random(numero));
    const number_random = (number) => (Math.round(Math.random() * number));    
    const total_array = 9;
    const n = 9;
    const [n1, n2, n3, n4, n5, n6, n7, n8, n9] = create_array(total_array, n);
    let cpfCrated = [];
    cpfCrated = [n1, n2, n3, n4, n5, n6, n7, n8, n9].slice();
    cpfCrated = cpfCrated.toString().replace(/,/g, "");

    const digito1 = ValidaCPF.geraDigito(cpfCrated);
    const digito2 = ValidaCPF.geraDigito(cpfCrated + digito1);
    const novoCPF = cpfCrated + digito1 + digito2;

    return novoCPF;
  }

  showCreatedCPF(){
    const badchars = /[^\d]/g;
    const mask = /(\d{3})(\d{3})(\d{3})(\d{2})/;
    const cpf = this.cpfCriado.replace(badchars, "");

    return cpf.replace(mask, "$1.$2.$3-$4");
  }
}

// Class for Interacting with HTML and Instances
class Validate {
  constructor(){
    this.buttonValidate = document.querySelector('#valida-cpf');
    this.buttonCreateCPF = document.querySelector('#gera-cpf');
    this.cpfInformado = document.querySelector('#cpf-informado');
    this.resultado = document.querySelector('.resultado');
  }

  validateButton() {
    this.buttonValidate.addEventListener("click", (event)=> {
      event.preventDefault();

      const validaCpf = new ValidaCPF(String(this.cpfInformado.value));
      this.results(validaCpf);
    })

    this.buttonCreateCPF.addEventListener('click', (event)=>{
      event.preventDefault();

      const cpfCriado = new CreateCPF();
      this.cpfInformado.value = cpfCriado.showCreatedCPF();
    })
  }

  results(cpf) {
    if (cpf.valida()){
      if(this.resultado.classList.contains('isNotValid')) this.resultado.classList.remove('isNotValid');
      this.resultado.innerText = 'Cpf Válido!';
      this.resultado.classList.add('isValid');
      this.resultado.style.display = 'inherit';
    }
    else {
      if(this.resultado.classList.contains('isValid')) this.resultado.classList.remove('isValid');
      this.resultado.innerText = 'Cpf inválido!';
      this.resultado.classList.add('isNotValid');
      this.resultado.style.display = 'inherit';
    }
  }
}

const validate = new Validate();
validate.validateButton();

