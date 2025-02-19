const con = require ('../connect');//Pra criar escreve connect.js depois pode tirar o .js

const create = (req, res) => {
    const {paciente, medico, data} = req.body;
    con.query('INSERT INTO consultas(nome_paciente, nome_medico, data_hora) VALUES(?,?,?)',
        [paciente, medico, data], (err, result) => {
        if(err){
            res.status(500).json({erro: err});
        }else{
            res.status(201).json(result);
        }
    });
};

const read = (req, res) => {
    con.query('SELECT * FROM consultas', (err, result) => {
        if(err){
            res.status(400).json({erro: err});
        }else{
            res.status(201).json(result);
        }
    });
};

const deletar = (req, res) => {
    const { id } = req.params;
    con.query('DELETE FROM consultas WHERE consulta_id = ?', [id], (err, result) => {
        if (err) {
            res.status(500).json({ erro: err });
        } else {
            res.status(200).json(result); 
        }
    });
};

const update = (req, res) => {
    const { id } = req.params;
    const { nome_paciente, nome_medico, data_hora } = req.body; 
    con.query('UPDATE consultas SET nome_paciente = ?, nome_medico = ?, data_hora = ? WHERE consulta_id = ?', [nome_paciente, nome_medico, data_hora, id], (err, result) => {
        if (err) {
            res.status(500).json({ erro: err });
        } else {
            res.status(200).json(result); 
        }
    });
};

module.exports = { read, create, deletar, update };