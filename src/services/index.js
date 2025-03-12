export async function addData(currentTab,formData){
    try {
        const response = await fetch(`/api/${currentTab}/add`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData)
        });
 
        const result = await response.json();
        return result;

    } catch (e) {
        console.log(e);
    } 
}

export async function getData(currentTab){
    try {
        const response = await fetch(`/api/${currentTab}/get`,{
            method: "GET"
        });

        const result = await response.json();
        return result;

    } catch (e) {
        console.log(e);
    }
}

export async function updateData(currentTab,formData){
    try {
        const response = await fetch(`/api/${currentTab}/update`,{
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData)
        });

        const result = await response.json();
        return result;

    } catch (e) {
        console.log(e);
    } 
}

export async function login(formData){
    try {
        const response = await fetch(`/api/login`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData)
        });

        const result = await response.json();
        return result;

    } catch (e) {
        console.log(e);
    } 
}

export async function handleDelete(id,field) {
    try {
        const res = await fetch(`/api/${field}/delete`,{
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({id})
        });

        return res.json();
        
    } catch (e) {
        console.error("Error Deleting items",e);
        return { success: false, message: "Failed to delete item"};
    }
}

