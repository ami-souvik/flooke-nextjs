const Basic = ({ polish, children }) => (
  <div className="card-piece backdrop back" style={polish}>
    {children}
  </div>
)

const Header = ({ title = '', total = 0 }) => (
  <div className="card-piece backdrop head">
    <h2 className="title">{title}</h2>
    <h2 className="total">₹ {total}</h2>
  </div>
)

const LineItem = ({ timestamp, item, count }) : JSX.Element => (
  <div className="card-piece linestamp">
    <h6 className="timestamp">{timestamp}</h6>
    <div className="lineitem">
      <h4 className="item">{item}</h4>
      <h4 className="count">{count}</h4>
    </div>
  </div>
)

const Body = ({ details }) => (
  <div className="card-piece backdrop body">
    {details &&
      Object.keys(details).map(cat => (
        <>
          {details[cat] &&
            Object.keys(details[cat]).map(item => (
              <LineItem
                timestamp="06:29 PM"
                item={item}
                count={details[cat][item].count}
              />
            ))
          }
        </>
      ))
    }
  </div>
)

export default {
  Basic,
  Header,
  Body
}