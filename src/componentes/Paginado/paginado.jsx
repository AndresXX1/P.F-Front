import style from "../Paginado/Paginado.module.css"

const Paginado = ({ totalSneaker, page, pageSize, setCurrentPage }) => {
    console.log("Page in paginado:", page);
    
    const nextHandler = () => {
      if (page <= totalSneaker/ pageSize ) {
        setCurrentPage(page + 1);
      }
    };
  
    const prevHandler = () => {
      if (page > 1) {
        setCurrentPage(page - 1);
      }
    };
    
    return (
      <div className={style.container}>
        <div className={style.buttonsContainer}>
        <button onClick={prevHandler} disabled={page <= 1} className={style.buttons}>
          ⭀
          </button>
          <span style={{ color: 'black' }}>{page}</span>
          <button onClick={nextHandler} className={style.buttons} disabled={page >= Math.ceil(totalSneaker / pageSize)}>
          ⥱
          </button>
        </div>
      </div>
    );
  };

export default Paginado;
