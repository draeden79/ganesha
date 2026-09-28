#!/usr/bin/env python3
"""Original Ganesha training example: validated CSV to a replaceable report.

No network, scheduling, account access or external dependencies.
"""
import argparse
import csv
from decimal import Decimal
from pathlib import Path
import re
import sys
import tempfile


def make_report(source):
    records, seen = [], set()
    with source.open(encoding='utf-8-sig', newline='') as stream:
        reader = csv.DictReader(stream)
        if reader.fieldnames is None or sorted(reader.fieldnames) != ['amount', 'id', 'item']:
            raise ValueError('Cabeçalho esperado: id,item,amount (uma coluna de cada).')
        for row in reader:
            if None in row or any(value is None for value in row.values()):
                raise ValueError(f'Linha {reader.line_num}: quantidade de campos incorreta.')
            ident, item, amount = (row[key].strip() for key in ('id', 'item', 'amount'))
            if not ident or not item:
                raise ValueError(f'Linha {reader.line_num}: id e item são obrigatórios.')
            if ident in seen:
                raise ValueError(f'Linha {reader.line_num}: id repetido: {ident}.')
            if not re.fullmatch(r'[0-9]+(?:\.[0-9]{1,2})?', amount):
                raise ValueError(f'Linha {reader.line_num}: amount deve ser não negativo, com ponto e até 2 casas decimais.')
            seen.add(ident)
            records.append((ident, item, Decimal(amount)))
    if not records:
        raise ValueError('CSV sem registros; o relatório anterior será preservado.')
    total = sum((row[2] for row in records), Decimal('0'))

    def cell(value):
        return value.replace('|', '\\|').replace('\r', ' ').replace('\n', ' ')

    lines = ['# Relatório de treino', '', f'Entrada: {source.name}',
             f'Registros: {len(records)}', f'Total: {total:.2f}', '',
             '| id | item | amount |', '| --- | --- | ---: |']
    lines += [f'| {cell(ident)} | {cell(item)} | {amount:.2f} |'
              for ident, item, amount in records]
    return '\n'.join(lines) + '\n'


def run(source, output):
    if source.resolve() == output.resolve():
        raise ValueError('Entrada e saída devem ser arquivos diferentes.')
    # Validate and build everything before opening any output file.
    result = make_report(source)
    temporary = None
    try:
        with tempfile.NamedTemporaryFile(mode='w', encoding='utf-8',
                                         dir=output.parent, delete=False) as stream:
            temporary = Path(stream.name)
            stream.write(result)
        temporary.replace(output)
    finally:
        if temporary is not None and temporary.exists():
            temporary.unlink()


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('input', type=Path)
    parser.add_argument('output', type=Path, nargs='?', default=Path('report.md'))
    args = parser.parse_args()
    try:
        run(args.input, args.output)
    except (OSError, ValueError, csv.Error) as error:
        print(f'Erro: {error}', file=sys.stderr)
        return 2
    print(f'Relatório atualizado: {args.output}')
    return 0


if __name__ == '__main__':
    sys.exit(main())
