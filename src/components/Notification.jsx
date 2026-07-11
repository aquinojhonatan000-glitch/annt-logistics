"use client";

export default function Notification({mensaje,onClose}){


return(

<div className="
fixed
top-6
right-6
z-[100]
bg-[#181818]
border
border-[#f5b800]
rounded-2xl
p-5
w-80
shadow-[0_0_35px_rgba(245,184,0,0.25)]
fade-up
">


<div className="
text-2xl
mb-2
">

✅

</div>


<h3 className="
text-[#f5b800]
font-bold
text-lg
">

ANNT LOGISTICS

</h3>



<p className="
text-white
mt-2
">

{mensaje}

</p>



<button

onClick={onClose}

className="
mt-4
w-full
bg-[#f5b800]
text-black
font-bold
py-2
rounded-xl
"

>

Continuar

</button>



</div>

);


}