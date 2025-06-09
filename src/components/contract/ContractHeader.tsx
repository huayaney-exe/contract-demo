
interface ContractHeaderProps {
  companyName: string;
}

const ContractHeader = ({ companyName }: ContractHeaderProps) => {
  return (
    <div className="text-center mb-6">
      <h1 className="text-xl font-bold mb-2">ANEXO PAGOS MASIVOS</h1>
      <p className="text-sm">
        Si desea afiliarse a los servicios de Pago de Remuneraciones y CTS, Pago a Proveedores y/o Pagos Varios, por favor complete este anexo.
      </p>
    </div>
  );
};

export default ContractHeader;
