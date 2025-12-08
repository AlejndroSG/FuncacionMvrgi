export const runtime = 'nodejs';

export async function POST(req) {
  try {
    const { nombre, email, telefono, edad, experiencia, motivacion } = await req.json();

    // Validaciones
    if (!nombre || nombre.trim().length < 2) {
      return new Response(JSON.stringify({ error: 'Nombre inválido' }), { 
        status: 400, 
        headers: { 'content-type': 'application/json' } 
      });
    }

    if (!email || !email.includes('@')) {
      return new Response(JSON.stringify({ error: 'Email inválido' }), { 
        status: 400, 
        headers: { 'content-type': 'application/json' } 
      });
    }

    if (!telefono || telefono.trim().length < 6) {
      return new Response(JSON.stringify({ error: 'Teléfono inválido' }), { 
        status: 400, 
        headers: { 'content-type': 'application/json' } 
      });
    }

    if (!edad || parseInt(edad) < 18) {
      return new Response(JSON.stringify({ error: 'Debes ser mayor de 18 años' }), { 
        status: 400, 
        headers: { 'content-type': 'application/json' } 
      });
    }

    if (!motivacion || motivacion.trim().length < 10) {
      return new Response(JSON.stringify({ error: 'Por favor, explica tu motivación' }), { 
        status: 400, 
        headers: { 'content-type': 'application/json' } 
      });
    }

    // Datos del voluntario interesado
    const voluntarioData = {
      nombre: nombre.trim(),
      email: email.trim().toLowerCase(),
      telefono: telefono.trim(),
      edad: parseInt(edad),
      experiencia: experiencia?.trim() || '',
      motivacion: motivacion.trim(),
      fecha: new Date().toISOString(),
      tipo: 'voluntariado-internacional'
    };

    // Log en consola (en producción, guardar en base de datos)
    console.log('📋 Nuevo interesado en Voluntariado Internacional:', voluntarioData);

    // TODO: Guardar en base de datos
    // await db.volunteers.create(voluntarioData);

    // TODO: Enviar email de notificación al administrador
    // await sendAdminNotification(voluntarioData);

    // TODO: Enviar email de confirmación al usuario
    // await sendUserConfirmation(voluntarioData);

    return new Response(JSON.stringify({ 
      success: true,
      message: 'Registro recibido correctamente' 
    }), { 
      status: 200, 
      headers: { 'content-type': 'application/json' } 
    });

  } catch (err) {
    console.error('Error procesando registro de voluntariado:', err);
    return new Response(JSON.stringify({ error: 'Error del servidor' }), { 
      status: 500, 
      headers: { 'content-type': 'application/json' } 
    });
  }
}
