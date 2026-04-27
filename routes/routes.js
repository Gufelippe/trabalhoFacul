const express = require('express');
const router = express.Router();
const supabase = require('../db');

module.exports = router;

// POST /api/post — Criar nova tarefa
router.post('/post', async (req, res) => {
    const { descricao, statusRealizada } = req.body;

    const { data, error } = await supabase
        .from('tarefas')
        .insert([{ descricao, status_realizada: statusRealizada }])
        .select()
        .single();

    if (error) return res.status(400).json({ message: error.message });
    res.status(200).json({
        _id: data.id,
        descricao: data.descricao,
        statusRealizada: data.status_realizada
    });
});

// GET /api/getAll — Buscar todas as tarefas
router.get('/getAll', async (req, res) => {
    const { data, error } = await supabase
        .from('tarefas')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) return res.status(500).json({ message: error.message });

    const tarefas = data.map(t => ({
        _id: t.id,
        descricao: t.descricao,
        statusRealizada: t.status_realizada
    }));
    res.json(tarefas);
});

// DELETE /api/delete/:id — Remover tarefa
router.delete('/delete/:id', async (req, res) => {
    const { data, error } = await supabase
        .from('tarefas')
        .delete()
        .eq('id', req.params.id)
        .select()
        .single();

    if (error) return res.status(400).json({ message: error.message });
    res.json({ _id: data.id, descricao: data.descricao });
});

// PATCH /api/update/:id — Atualizar tarefa
router.patch('/update/:id', async (req, res) => {
    const updates = {};
    if (req.body.descricao !== undefined) updates.descricao = req.body.descricao;
    if (req.body.statusRealizada !== undefined) updates.status_realizada = req.body.statusRealizada;

    const { data, error } = await supabase
        .from('tarefas')
        .update(updates)
        .eq('id', req.params.id)
        .select()
        .single();

    if (error) return res.status(400).json({ message: error.message });
    res.json({
        _id: data.id,
        descricao: data.descricao,
        statusRealizada: data.status_realizada
    });
});
