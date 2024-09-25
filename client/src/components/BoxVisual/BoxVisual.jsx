import styles from "./BoxVisual.module.css";
import BoxImg from "../../assets/images/box.png"

export default function BoxVisual () {
    return (
    <img className={styles.box_img} src={BoxImg} alt= "une boxe à idée avec une grande ampoule apparente" />  

    );
  }