

function History(){
;
    const Complaints = [
        {
            id : 1,
            image : "no preview",
            status: "in progress"
        },
        {
            id : 2,
            image : "no preview",
            status: "in progress"
        },
        {
            id : 3,
            image : "no preview",
            status: "in progress"
        },
        {
            id : 4,
            image : "no preview",
            status: "in progress"
        }
    ]
    return(
        <>
            <div>
                <h1>Your Complaints</h1>
            </div>
            <div>
                <table>
                    <thead>
                        <tr>
                            <td>Complaint Id</td>
                            <td>Image</td>
                            <td>status</td>
                        </tr>
                    </thead>
                    <tbody>
                        {Complaints.map((c)=> <tr><td>{c.id}</td>
                                              <td>{c.image}</td>
                                              <td>{c.status}</td>
                                              </tr>)}
                    </tbody>

                </table>
            </div>
        </>
    )
}

export default History;