export const formatCPF = (cpf: string) => {
    const cleanedCpf = cpf.replace(/\D+/g, '');

    if (cleanedCpf.length !== 11) return false;

    if (cleanedCpf.split('').every((d) => d === cleanedCpf[0])) {
      return false;
    }

    let soma = 0;
    for (let i = 0; i < 9; i++) {
      soma += parseInt(cleanedCpf[i]) * (10 - i);
    }
    let dv1 = 11 - (soma % 11);
    if (dv1 > 9) dv1 = 0;

    soma = 0;
    for (let i = 0; i < 10; i++) {
      soma += parseInt(cleanedCpf[i]) * (11 - i);
    }
    let dv2 = 11 - (soma % 11);
    if (dv2 > 9) dv2 = 0;

    return (
      cleanedCpf[9] === dv1.toString() && cleanedCpf[10] === dv2.toString()
    );
  };