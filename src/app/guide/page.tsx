export default function Guide() {
  return (
      <div className="leading-8 mx-20">
          <h1>Guía de Usuario</h1>
          <div className="flex flex-row mt-6">
              <p>Le damos la bienvenida a</p>
              <div className="title-on-text">
                  <img src="/icons/deepker-original.webp" alt="logo"/>
                  <p>DeepKer</p>
              </div>
          </div>
          <p>
              Para comenzar a utilizar el sistema y aprovechar al máximo sus
              funciones, le presentamos el siguiente video guía. Este video le llevará
              a través de los pasos esenciales para usar la aplicación de manera
              efectiva.
          </p>
          <p className="font-medium">¿Qué aprenderá en el video?</p>
          <ul className="list-disc mx-6">
              <li>
                  <span className="font-medium">Navegación Básica:</span> Una
                  descripción general de la interfaz y cómo gestionar las alertas
                  recibidas.
              </li>
              <li>
                  <span className="font-medium">Funciones Principales:</span> Conozca
                  las herramientas clave para el monitoreo de anomalías cardiacas.
              </li>
              <li>
                  <span className="font-medium">Consejos Útiles:</span> Recomendaciones
                  para maximizar el rendimiento de la aplicación y realizar un
                  seguimiento efectivo de la salud de los pacientes.
              </li>
          </ul>
          <p className="font-medium">¿Cómo ver el video?</p>
          <p>
              Haga clic en el reproductor de video a continuación para empezar la
              guía.
          </p>
          <iframe
              id="ytplayer"
              className="w-[700px] h-[400px] mt-10 mx-auto"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              src="https://www.youtube.com/embed/zcSx5XCm2uM?autoplay=0&origin=http://example.com&controls=0&rel=1"
              allowFullScreen
          ></iframe>
      </div>
  );
}
