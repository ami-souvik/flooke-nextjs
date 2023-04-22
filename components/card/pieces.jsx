import IconButton from '@mui/material/IconButton';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import SavingsRoundedIcon from '@mui/icons-material/SavingsRounded';

const Basic = ({ children, polish = null }) => (
  <div className="card-piece backdrop back" style={polish}>
    {children}
  </div>
)

const Header = ({ title = '', total = 0 }) => (
  <div>
    <h2>{title}</h2>
    <h2>₹ {total}</h2>
  </div>
)

const LineItem = ({ timestamp=null, item=null, count=null, comment=null }) => (
  <div className="card-piece linestamp">
    <h6 className="timestamp">{timestamp}</h6>
    <div className="lineitem">
      <h4 className="item">{item}</h4>
      <h4 className="count">{count}</h4>
    </div>
    {comment && (
      <h4
        className="comment"
        style={{ backgroundColor: '#57C5B6' }}>{comment}</h4>)}
  </div>
)

const Body = ({ details=null, onEdit=null, onDelete=null, onProcess=null }) => (
  <div className="card-piece backdrop body">
    {details &&
      Object.keys(details).map(cat => (
        <>
          {details[cat] &&
            Object.keys(details[cat]).map(item => (
              <LineItem
                key={item}
                timestamp={details[cat][item].timestring}
                item={item}
                count={details[cat][item].count}
                comment={details[cat][item].comment}
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