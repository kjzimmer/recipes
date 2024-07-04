

export const BlankAdminPage = () => {
    return (<>
        <h2>Blank Admin Page</h2>
        <p>Should not be able to gete here without authentication AND admin authorization</p>
        <p>See code in ProtectedAdminRoutes.jsx, PrivateRoutes where authorization check is performed</p>
        <p></p>
    </>)
}