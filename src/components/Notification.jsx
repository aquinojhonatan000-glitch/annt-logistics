"use client";

export default function Notification({ mensaje, onClose }) {

return (

<div
className="
fixed
top-6
right-6
z-[100]
w-[360px]
bg-[#181818]
border
border-[#f5b800]
rounded-3xl
p-6
shadow-[0_0_40px_rgba(245,184,0,0.25)]
fade-up
"
>


<div className="
flex
items-center
gap-4
mb-4
">


<div
className="
w-14
h-14
rounded-full
bg-[#f5b800]
flex
items-center
justify-center
text-black
text-3xl
font-bold
"
>
✓
</div>



<div>

<h2
className="
text-xl
font-bold
text-[#f5b800]
"
>
ANNT LOGISTICS
</h2>


<p
className="
text-gray-300
text-sm
"
>
Compra segura
</p>


</div>


</div>




<p
className="
text-white
leading-relaxed
mb-5
"
>
{mensaje}
</p>





<div
className="
h-1
bg-[#333]
rounded-full
overflow-hidden
mb-5
"
>

<div
className="
h-full
bg-[#f5b800]
animate-progress
"
/>

</div>





<button

onClick={onClose}

className="
w-full
bg-[#f5b800]
text-black
font-bold
py-3
rounded-xl
hover:bg-[#ffd700]
transition
"

>

Continuar

</button>



</div>

);

}