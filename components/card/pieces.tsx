import IconButton from '@mui/material/IconButton';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import SavingsRoundedIcon from '@mui/icons-material/SavingsRounded';

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

const Body = ({ details, onEdit, onDelete, onProcess }) => (
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
    <IconButton
      aria-label="edit"
      onClick={onEdit}
      style={{
        padding: "6px",
        backgroundColor: "#ddd"
      }}>
      <EditRoundedIcon fontSize="medium" />
    </IconButton>
    <IconButton
      aria-label="edit"
      onClick={onDelete}
      style={{
        padding: "6px",
        backgroundColor: "#ddd"
      }}>
      <DeleteOutlineRoundedIcon fontSize="medium" />
    </IconButton>
    <IconButton
      aria-label="edit"
      onClick={onProcess}
      style={{
        padding: "6px",
        backgroundColor: "#ddd"
      }}>
      <SavingsRoundedIcon fontSize="medium" />
    </IconButton>
  </div>
)

export default {
  Basic,
  Header,
  Body
}