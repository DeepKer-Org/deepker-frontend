import React from 'react'
import ReturnButton from "@/src/components/ui/buttons/ReturnButton";
import CardWrapper from "@/src/components/ui/wrappers/CardWrapper";
import IconTitle from "@/src/components/ui/IconTitle";
import DetailRow from "@/src/components/ui/DetailRow";

const PatientDetail = ({ params }: { params: { id: string } }) => {
  return (
      <div className={"page__container"}>
        <div className="button__container">
          <ReturnButton/>
        </div>
        <div className={"details__container grid-cols-3 grid-rows-11"}>
          <CardWrapper className={"row-span-4"}>
            <IconTitle className={"mb-4"} icon={"person"} title={"Datos del paciente:"}/>
            <DetailRow label={"Nombre:"} name={"Nombre Apellido"}/>
            <DetailRow label={"DNI:"} name={"Mi dni"}/>
            <DetailRow label={"Edad:"} name={"32 años"}/>
            <DetailRow label={"Género:"} name={"Hombre"}/>
            <DetailRow label={"Lugar:"} name={"Mi lugar"}/>
            <DetailRow label={"Fecha ingreso:"} name={"12/09/2024"}/>
          </CardWrapper>
          <CardWrapper className={"row-span-3"}>
            <IconTitle className={"mb-4"} icon={"warning"} title={"Riesgos preexistentes:"}/>
            <ul>
              <li>Diabetes Mellitus</li>
              <li>Obesidad</li>
              <li>Antecedente de Infarto de Miocardio (Preinfarto)</li>
            </ul>
          </CardWrapper>
          <CardWrapper className={"row-span-8"}>
            <IconTitle className={"mb-4"} icon={"monitor"} title={"Métricas biométricas en monitoreo:"}/>
            <p>TODO</p>
          </CardWrapper>
          <CardWrapper className={"row-span-2"}>
            <IconTitle className={"mb-4"} icon={"health_and_safety"} title={"Médico asociado:"}/>
            <ul>
              <li>Doc. Francesco Lomparte</li>
            </ul>
          </CardWrapper>
          <CardWrapper className={"row-span-7"}>
            <h4>Linea de tiempo</h4>
            <p>TODO</p>
          </CardWrapper>
          <CardWrapper className={"row-span-3"}>
            <IconTitle className={"mb-4"} icon={"medication"}
                       title={"Medicación actual:"}/>
            <ul>
              <li><span>Hello:</span> 100 mg - Diario</li>
              <li><span>Hello:</span> 100 mg - Diario</li>
              <li><span>Hello:</span> 100 mg - Diario</li>
              <li><span>Hello:</span> 100 mg - Diario</li>
            </ul>
          </CardWrapper>
          <CardWrapper className={"row-span-3 col-span-2"}>
            <IconTitle className={"mb-4"} icon={"medication"} title={"Última alerta:"}/>
            <p>TODO</p>
          </CardWrapper>
        </div>
      </div>
  )
}

export default PatientDetail