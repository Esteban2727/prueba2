import { useState, useEffect, useRef } from "react";
import shuffle from "lodash.shuffle"; // librería para hacerlo de forma aleatoria
import "./StyleJuntarParejas.css"; 
import { useNavigate } from "react-router-dom";
import { BsFillHouseCheckFill } from "react-icons/bs";


const level1 = [
  "https://img.freepik.com/foto-gratis/retrato-abstracto-ojo-elegancia-mujeres-jovenes-generado-ai_188544-9712.jpg",
  "https://cdn.cnn.com/cnnnext/dam/assets/211117211009-pba-ranking-super-169.jpg", 
  "https://i.blogs.es/0ca9a6/aa/1366_2000.jpeg",
  "https://media.es.wired.com/photos/650b2a2e72d73ca3bd5ef0cc/16:9/w_2560%2Cc_limit/Business-OpenAI-Dall-E-3-heart.jpg",
  "https://i.pinimg.com/1200x/50/07/ed/5007edd4af49dc476e6dc43b5863aac5.jpg",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRaPkU7JLyOgzRsnJfouHUetbFjUhEswC6AMQ&s",
  "https://img.freepik.com/foto-gratis/pico-montana-nevada-majestuosidad-galaxia-estrellada-ia-generativa_188544-9650.jpg", 
  "https://png.pngtree.com/background/20230524/original/pngtree-sad-pictures-for-desktop-hd-backgrounds-picture-image_2705986.jpg",
  "https://png.pngtree.com/thumb_back/fh260/background/20230611/pngtree-wolf-animals-images-wallpaper-for-pc-384x480-image_2916211.jpg",
  "https://e.rpp-noticias.io/xlarge/2024/08/14/251925_1626775.webp"
];

const level2 = [
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwNQuEjXJk78xNdAXVtV4vEuSqIc78KM82xA&s",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQ_2oII-AssPFNOvcLQ6ecJ6ZWQlUbKU3j8w&s", 
  "https://img.freepik.com/foto-gratis/arco-iris-fotorrealista-paisaje-natural-campo_23-2151597635.jpg",
  "https://st5.depositphotos.com/64145070/64693/i/450/depositphotos_646930840-stock-photo-sunset-ocean-beach-beautiful-seascape.jpg",
  "https://plus.unsplash.com/premium_photo-1669867124806-f84dd1a9e87c?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fG5hdHVyYWxlemElMjBwYWlzYWplfGVufDB8fDB8fHww",
  "https://articles-img.sftcdn.net/t_articles/auto-mapping-folder/sites/2/2023/01/cinco-lagos.jpg",
  "https://th.bing.com/th/id/R.f62d9997e9a2afd7f01af5a20e7901a0?rik=jhF%2fRHIc4Ly3aQ&riu=http%3a%2f%2flavidaenpau.files.wordpress.com%2f2010%2f04%2ffondos-paisajes-1024202.jpg&ehk=00JnDBnD%2fBK0HNKUOLzjaiWGwpycYcpDqThjzhisO3w%3d&risl=&pid=ImgRaw&r=0", 
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5NmXfW2CYU7nQybs7t0abbhsjf7bYJlnV3A&s",
  "https://www.shutterstock.com/image-photo/mountain-trail-calm-lake-amazing-260nw-2382938023.jpg",
  "https://i.pinimg.com/564x/ae/82/96/ae82960888a27e4ed8c595590f881c6c.jpg",
  "https://www.shutterstock.com/image-photo/beautiful-landscape-sunrise-photo-taken-260nw-1686737464.jpg",
  "https://img.freepik.com/fotos-premium/paisaje-forestal-otono-pequeno-rio-suelo-calle-dia-soleado-imagen-generada-ia_548729-6955.jpg",
  "https://img.freepik.com/foto-gratis/paisaje-otono-carretera-forestal_23-2151843648.jpg",
  "https://i.pinimg.com/236x/06/24/0b/06240ba3eb20b18f45624bcffdaec5f3.jpg",
  "https://th.bing.com/th/id/R.e9b048a48117c2ab417382f3814826b8?rik=D%2fAd%2bjDq4mhxJw&riu=http%3a%2f%2f2.bp.blogspot.com%2f-KxNgp_J4gDo%2fT5tDGEYRSiI%2fAAAAAAAAa78%2fEJP3CsDxXV0%2fs1600%2fHermosos-Paisajes-Naturales-HD_06.jpg&ehk=FJZA02aRpiD9U8TtYTPQiCMeg8zFCaljDWom%2bjWITGc%3d&risl=&pid=ImgRaw&r=0"
];

export default function JuntarParejas() {
  const [cartas, setCartas] = useState([]);
  const [visible, setVisible] = useState([]);
  const [selected, setSelected] = useState([]);
  const [intentos, setIntentos] = useState(0);
  const [nivel, setNivel] = useState("clasico"); // Estado para el nivel seleccionado
  const [completado, setCompletado] = useState(false); // Estado para juego completado
  const [mensaje, setMensaje] = useState(""); // Estado para mensaje de finalización
  const isSelected = useRef(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    reiniciar();
  }, [nivel]); // Reinicia el juego cuando el nivel cambia

  const reiniciar = () => {
    setVisible([]);
    setCompletado(false); // Reiniciar estado de completado
    setMensaje(""); // Reiniciar mensaje
    if (nivel === "clasico") {
      setCartas(shuffle([...level1, ...level1]));
    } else {
      setCartas(shuffle([...level2, ...level2]));
    }
    setSelected([]);
    setIntentos(0);
  };

  useEffect(() => {
    if (completado) {
      registrarPuntuacion();
    }
  }, [completado]);

  const selectCart = (i) => {
    if (isSelected.current || selected.includes(i) || visible.includes(i)) return;

    const x = [...selected, i];
    setSelected(x);
    if (x.length === 2) {
      isSelected.current = true;
      if (cartas[x[0]] === cartas[x[1]]) {
        setVisible([...visible, ...x]);
        if (visible.length + 2 === cartas.length) {
          // Juego completado
          setCompletado(true);
          setMensaje("¡Juego completado! Número de intentos: " + intentos);
        }
      }
      setIntentos(intentos + 1);
      setTimeout(() => {
        setSelected([]);
        isSelected.current = false;
      }, 1000);
    }
  };

  const registrarPuntuacion = async () => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
        console.error("No se encontró el token de acceso.");
        return;
    }

    try {
        const response = await fetch("http://localhost:5000/juntar/registrar_puntuacion/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify({ intentos }),
        });

        if (response.ok) {
            console.log("Puntuación registrada exitosamente.");
        } else {
            console.error("Error al registrar la puntuación:", response.statusText);
        }
    } catch (error) {
        console.error("Error al registrar la puntuación:", error);
    }
  };

  const verificarCompletado = () => {
    
    if (visible.length === cartas.length) {
      setCompletado(true);
      setMensaje("¡Juego completado! Número de intentos: " + intentos);
      alert("muy bien, juego terminado")
    } else {
      alert("no ha sido terminado, sigue haciendolo")
    }
    
  };

  return (
    <div className={`first_container ${nivel === "clasico" ? "nivel-clasico" : "nivel-dificil"}`}>
      <div className="header_couples">
      <div className="icono">
                <BsFillHouseCheckFill
                    className="edit_home_profile"
                    onClick={() => {
                        navigate("/inicioSesion")
                       }}
                />
            </div>
        <h2 className="title_couples play">ENCUENTRA LA PAREJA</h2>
        <h2 className="count play">Número de intentos: {intentos}</h2>
        <div className="btn_reiniciar" onClick={reiniciar}>
          Reiniciar Juego
        </div>
      </div>

      <div className="todo">
        <div className="modo_Juego">
          <div
            className="clasico"
            onClick={() => setNivel("clasico")} // Cambiar al nivel clásico
          >
            Clásico
          </div>
          <div
            className="dificil"
            onClick={() => setNivel("dificil")} // Cambiar al nivel difícil
          >
            Difícil
          </div>
        </div>

        <div className="find_pairs">
          {cartas.map((c, i) => {
            const isFlipped = selected.includes(i) || visible.includes(i);
            return (
              <div
                className={`cartas ${isFlipped ? "rotada" : ""}`}
                key={i}
                onClick={() => selectCart(i)}
              >
                <div className="back_card"></div>
                {isFlipped && <img src={c} alt="" />}
              </div>
            );
          })}
        </div>

        <button className="btn_completado" onClick={verificarCompletado}>
          Completado
        </button>
        
      </div>
    </div>
  );
}
