import styles from "../styles/Home.module.scss";
import Calculator from "../components/Calculator";

export default function Home() {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <Calculator />
        <p className={styles.credit}>Made with ❤️ by oxholm.dev</p>
      </main>
    </div>
  );
}
