import InfoElement from "@/src/components/general/InfoElement";

export default function General() {
  return (
    <div className="w-[660px] mx-auto">
      <h1>Información General</h1>
      <div className="flex flex-col w-full gap-y-8 mt-8">
        <div>
          <InfoElement
            label="Nombre Completo"
            value="Carlos Alejandro Rosales Mercedes"
          />
          <InfoElement label="Puesto" value="Médico Interno" />
          <InfoElement label="Área" value="Cardiología" />
          <InfoElement
            label="Centro de Trabajo"
            value="Hospital General de México"
          />
          <InfoElement
            label="Horarios"
            value="L-V 8:00 AM a 5:00 PM"
            lastElement
          />
        </div>
        <div>
          <InfoElement label="Nombre del Sistema" value="DeepKer" />
          <InfoElement label="Versión" value="1.0.0" lastElement />
        </div>
      </div>
    </div>
  );
}
