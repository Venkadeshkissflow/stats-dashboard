import styles from "./styles.module.css"

export default function Card({className, children}){
    return (
        <div className={`${styles.cardWidget} ${className}`}>
            {children}
        </div>
    )
}