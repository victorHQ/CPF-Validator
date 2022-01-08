class CPFMask {
  constructor() { this.cpf = document.querySelector("#cpf-informado"); }

  mascara() {
    this.cpfFormatado = this.cpf.value;

    // Impede a entrada de outro caractere que não seja número
    if (isNaN(this.cpfFormatado[this.cpfFormatado.length - 1])) {
      this.cpf.value = this.cpfFormatado.substring(0, this.cpfFormatado.length - 1);
      return;
    }

    this.cpf.setAttribute("maxlength", "14");

    if (this.cpfFormatado.length === 3 || this.cpfFormatado.length === 7) this.cpf.value += ".";
    if (this.cpfFormatado.length === 11) this.cpf.value += "-"; 
    
    return this.cpfFormatado;
  }

  maskCall() { this.cpf.onkeydown = () => { this.mascara(); } }
}

const cpfMask = new CPFMask();
cpfMask.maskCall();