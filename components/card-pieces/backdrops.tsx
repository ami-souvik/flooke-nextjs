const Basic = ({ polish, children }) => (
  <div className="card-piece backdrop back" style={polish}>
    {children}
  </div>
)

const Header = ({ title, total }) => (
  <div className="card-piece backdrop head">
    <h2 className="title">{title}</h2>
    <h2 className="total">{total}</h2>
  </div>
)

export default {
  Basic,
  Header
}