function Card({title,data}) {
    return (
        <div className="Card">
            <h3 className="Card__title">
                {title}
            </h3>
            <p className="Card__data">
                {data}
            </p>
        </div>
    )
}
export default Card;