import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.scss";
import Calculator from "../components/Calculator";

export default function Home() {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <Calculator />
      </main>
    </div>
  );
}
