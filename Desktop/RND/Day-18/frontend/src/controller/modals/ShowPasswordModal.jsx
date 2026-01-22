
const ShowPasswordModal = ({ closeModal, error }) => {
    const styles = {
        overlay: {
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            backdropFilter: 'blur(5px)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000
        },
        modal: {
            backgroundColor: 'white',
            padding: '30px',
            borderRadius: '8px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            maxWidth: '400px',
            zIndex: 1001
        },
        button: {
            padding: '10px 20px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
        }
    };

    return (
        <>
            <div style={styles.overlay}>
                <div style={styles.modal}>
                    <h1>Password must follow these rules:</h1>
                    <ul>
                        {error.map((e, i) => (
                            <li style={{color:'red'}} key={i}>{e}</li>
                        ))}
                    </ul>
                    <button style={styles.button} onClick={closeModal}>OK</button>
                </div>
            </div>
            <style>{`body { overflow: hidden; }`}</style>
        </>
    );
};

export default ShowPasswordModal;