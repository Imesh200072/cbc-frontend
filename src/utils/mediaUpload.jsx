const url = "https://enjuzvuacqbshzymotyx.supabase.co"
const key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVuanV6dnVhY3Fic2h6eW1vdHl4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE2NzE1NzYsImV4cCI6MjA2NzI0NzU3Nn0.VXZfXMso9z9qWwdJSwh7KNa4wvHkSvz-8EKWeSCnd-A"

import { createClient } from "@supabase/supabase-js"


const supabase = createClient(url, key)

export default function mediaUpload(file) {
	return new Promise((resolve, reject) => {
        if(file == null){
            reject("No file selected")
        }

		const timestamp = new Date().getTime();
		const fileName = timestamp + file.name;

		supabase.storage
			.from("images")
			.upload(fileName, file, {
				cacheControl: "3600",
				upsert: false,
			})
			.then(() => {
				const publicUrl = supabase.storage.from("images").getPublicUrl(fileName)
					.data.publicUrl;
				resolve(publicUrl);
			}).catch(()=>{
                reject("Error uploading file")
            })
	});
}

