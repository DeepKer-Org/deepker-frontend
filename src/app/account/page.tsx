import InfoElement from "@/src/components/sections/account/InfoElement";

export default function Account() {
  return (
    <div className="w-[660px] mx-auto">
      <h1>Cuenta</h1>
      <div className="flex flex-col w-full gap-y-6 mt-6">
        <div>
          <h4 className={"mb-4"}>Usuario</h4>
          <InfoElement
            label="Nombre Completo"
            value="Carlos Alejandro Rosales Mercedes"
          />
          <InfoElement label="Puesto" value="Médico Interno" />
          <InfoElement label="Área" value="Cardiología" />
          <InfoElement
            label="Centro de Trabajo"
            value="Hospital General de México"
            lastElement
          />
        </div>
        <div>
          <h4 className={"mb-4"}>Aplicación</h4>
          <InfoElement label="Nombre del Sistema" value="DeepKer" />
          <InfoElement label="Versión" value="1.0.0" lastElement />
        </div>
      </div>
    </div>
  );
}
