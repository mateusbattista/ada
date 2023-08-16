from django.core.exceptions import ValidationError
import re


def valida_cpf(valor):
    """ Validador de CPF """

    cpf = re.sub(r'\D', '', str(valor))

    if len(cpf) != 11 or cpf in [s * 11 for s in [str(n) for n in range(10)]]:
        raise ValidationError("CPF inválido.")

    # Calcula o primeiro dígito verificador
    soma_produtos = sum((i + 1) * int(cpf[i]) for i in range(9))
    primeiro_digito = soma_produtos % 11 % 10
    if int(cpf[9]) != primeiro_digito:
        raise ValidationError("CPF inválido.")

    # Calcula o segundo dígito verificador
    soma_produtos = sum(i * int(cpf[i]) for i in range(10))
    segundo_digito = soma_produtos % 11 % 10
    if int(cpf[10]) != segundo_digito:
        raise ValidationError("CPF inválido.")


def valida_cnpj(valor):
    """ Validador de CNPJ """

    # Remove caracteres não numéricos
    cnpj = re.sub(r'\D', '', str(valor))

    if len(cnpj) != 14:
        raise ValidationError("CNPJ inválido.")

    # Validação dos dígitos verificadores
    verificadores = cnpj[-2:]

    # Define o fator de cálculo
    fator_calculo = list(range(5, 1, -1)) + list(range(9, 1, -1))

    # Calcula o primeiro dígito verificador
    soma = sum(int(digito) * fator for digito, fator in zip(cnpj[:-2], fator_calculo))
    resto = soma % 11
    primeiro_digito = 0 if resto < 2 else 11 - resto
    if int(verificadores[0]) != primeiro_digito:
        raise ValidationError("CNPJ inválido.")

    # Calcula o segundo dígito verificador
    fator_calculo.insert(0, 6)  # adiciona o fator 6 no início da lista
    soma = sum(int(digito) * fator for digito, fator in zip(cnpj[:-1], fator_calculo))
    resto = soma % 11
    segundo_digito = 0 if resto < 2 else 11 - resto
    if int(verificadores[1]) != segundo_digito:
        raise ValidationError("CNPJ inválido.")
